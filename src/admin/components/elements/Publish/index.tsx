import React, { useCallback } from 'react';
import FormSubmit from '../../forms/Submit';
import { Props } from './types';
import { useDocumentInfo } from '../../utilities/DocumentInfo';
import { useForm, useFormModified } from '../../forms/Form/context';

const Publish: React.FC<Props> = () => {
  const { unpublishedVersions, publishedDoc } = useDocumentInfo();
  const { submit } = useForm();
  const modified = useFormModified();

  const hasNewerVersions = unpublishedVersions?.totalDocs > 0;
  const canPublish = modified || hasNewerVersions || !publishedDoc;

  const publish = useCallback(() => {
    submit({
      overrides: {
        _status: 'published',
      },
    });
  }, [submit]);

  return (
    <FormSubmit
      type="button"
      onClick={publish}
      disabled={!canPublish}
    >
      发布修改
    </FormSubmit>
  );
};

export default Publish;
