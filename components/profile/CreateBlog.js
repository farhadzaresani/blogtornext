import { Button, Container, TextField } from "@mui/material";

const CreateBlog = (props) => {
  return (
    <Container bgcolor={"primary.main"} className=' space-y-6 rounded-lg p-4'>
      <h1>Create Blog</h1>
      <TextField
        value={props.blogtitle}
        onChange={props.title}
        fullWidth
        label='Title:'
      />
      <TextField
        value={props.blogcontent}
        onChange={props.content}
        fullWidth
        label='Content:'
        multiline
        rows={15}
      />
      <Button className='bg-blue text-white' onClick={props.action}>
        Create
      </Button>
    </Container>
  );
};

export default CreateBlog;
