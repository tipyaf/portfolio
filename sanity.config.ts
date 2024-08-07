import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {visionTool} from "@sanity/vision";

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: '54wst7vc',
  dataset: 'production',
  basePath: "/portfolio",
  plugins: [
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
});

