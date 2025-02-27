// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

const EditorUncontrolled = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Uncontrolled Editor</CardTitle>
      </CardHeader>
      <CardBody>
        <Editor />
      </CardBody>
    </Card>
  );
};

export default EditorUncontrolled;
