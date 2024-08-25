import { setIfMissing } from 'sanity';
import { at, defineMigration } from 'sanity/migrate';

// to run this:
// $  sanity migration run  rename-field --no-dry-run

export default defineMigration({
  title: 'Rename workHistory to jobs',
  documentTypes: ['profile'],

  migrate: {
    document(doc) {
      return [at('projects', setIfMissing([]))];
    },
  },
});
