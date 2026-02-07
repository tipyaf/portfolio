import { useCallback, useState } from 'react';
import type { DocumentActionComponent } from 'sanity';
import { useDocumentOperation } from 'sanity';
import { blocksToHtml, htmlToBlocks } from '../lib/portable-text-translator';
import {
  jobFields,
  projectFields,
  topLevelFields,
  type TranslationField,
} from '../lib/translation-field-map';

type AnyDoc = Record<string, any>;

function getNestedValue(obj: AnyDoc, path: string): unknown {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

interface TextEntry {
  fieldPath: string;
  type: 'string' | 'text' | 'portableText';

  sourceBlocks?: any[];
}

function collectTexts(
  doc: AnyDoc,
  fields: TranslationField[],
  prefix: string,
): { texts: string[]; entries: TextEntry[] } {
  const texts: string[] = [];
  const entries: TextEntry[] = [];

  for (const field of fields) {
    if (field.type === 'skip') continue;

    const value = getNestedValue(doc, field.source);
    if (!value) continue;

    if (field.type === 'portableText') {
      const blocks = value as any[];
      const html = blocksToHtml(blocks);
      if (!html) continue;
      texts.push(html);
      entries.push({
        fieldPath: `${prefix}${field.target}`,
        type: 'portableText',
        sourceBlocks: blocks,
      });
    } else {
      const text = value as string;
      if (!text.trim()) continue;
      texts.push(text);
      entries.push({
        fieldPath: `${prefix}${field.target}`,
        type: field.type as 'string' | 'text',
      });
    }
  }

  return { texts, entries };
}

export const TranslateToFrenchAction: DocumentActionComponent = (props) => {
  const { id, type, published, draft } = props;
  const doc = (draft || published) as AnyDoc | null;
  const { patch, publish } = useDocumentOperation(id, type);
  const [status, setStatus] = useState<'idle' | 'confirming' | 'translating' | 'done' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');

  const handleTranslate = useCallback(async () => {
    if (!doc) return;

    setStatus('translating');

    try {
      const allTexts: string[] = [];
      const allEntries: TextEntry[] = [];

      // Top-level fields
      const topLevel = collectTexts(doc, topLevelFields, '');
      allTexts.push(...topLevel.texts);
      allEntries.push(...topLevel.entries);

      // Job fields
      const jobs = (doc.jobs || []) as AnyDoc[];
      jobs.forEach((job: AnyDoc, i: number) => {
        const result = collectTexts(job, jobFields, `jobs[${i}].`);
        allTexts.push(...result.texts);
        allEntries.push(...result.entries);
      });

      // Project fields
      const projects = (doc.projects || []) as AnyDoc[];
      projects.forEach((project: AnyDoc, i: number) => {
        const result = collectTexts(project, projectFields, `projects[${i}].`);
        allTexts.push(...result.texts);
        allEntries.push(...result.entries);
      });

      if (allTexts.length === 0) {
        setMessage('Aucun texte EN trouvé à traduire.');
        setStatus('done');
        return;
      }

      // Batch translate (chunks of 50)
      const translatedTexts: string[] = [];
      for (let i = 0; i < allTexts.length; i += 50) {
        const chunk = allTexts.slice(i, i + 50);
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            texts: chunk,
            sourceLang: 'EN',
            targetLang: 'FR',
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        translatedTexts.push(...data.translations.map((t: { text: string }) => t.text));
      }

      // Build patch operations

      const patchSet: Record<string, any> = {};

      allEntries.forEach((entry, i) => {
        const translated = translatedTexts[i];
        if (entry.type === 'portableText') {
          patchSet[entry.fieldPath] = htmlToBlocks(translated, entry.sourceBlocks || []);
        } else {
          patchSet[entry.fieldPath] = translated;
        }
      });

      // Apply patch via Sanity document operation
      patch.execute([{ set: patchSet }]);

      setMessage(`${allEntries.length} champs traduits avec succès !`);
      setStatus('done');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Erreur inconnue');
      setStatus('error');
    }
  }, [doc, patch]);

  if (!doc) {
    return { label: 'Traduire en FR', disabled: true };
  }

  if (status === 'confirming') {
    return {
      label: 'Traduire en FR',
      tone: 'primary',
      dialog: {
        type: 'confirm',
        message: 'Les traductions FR existantes seront écrasées. Continuer ?',
        onCancel: () => setStatus('idle'),
        onConfirm: () => handleTranslate(),
      },
    };
  }

  if (status === 'translating') {
    return {
      label: 'Traduction en cours…',
      disabled: true,
    };
  }

  if (status === 'done' || status === 'error') {
    return {
      label: 'Traduire en FR',
      dialog: {
        type: 'confirm',
        message,
        onCancel: () => setStatus('idle'),
        onConfirm: () => setStatus('idle'),
      },
    };
  }

  return {
    label: 'Traduire en FR',
    tone: 'primary',
    onHandle: () => setStatus('confirming'),
  };
};
