import React, { useEffect, useState } from 'react'
import styles from './newpost.module.css';
import Layout from '../../../components/Layout';
import Head from 'next/head';
import { Box, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ADD_POST_MUTATION } from '../../../lib/graphQL/mutations';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");
  // useMutation
  const [addPost, { data, loading, error, reset }] = useMutation(ADD_POST_MUTATION);
  const router = useRouter();

  useEffect(() => {
    if (data?.createPost) {
      setTimeout(() => {
        handleCancel();
      }, 3000);
    }
  }, [data])

  const handleSubmit = () => {
    if (postTitle && postBody) {
      addPost({
        variables: {
          title: postTitle,
          body: postBody,
        }
      });
    }
  }

  const handleCancel = () => {
    router.back();
    reset();
  }
  return (
    <Layout>
      <Head>
        <title>New Post</title>
      </Head>
      <div className={styles.newpostContainer}>
        <h2>New Post</h2>
        {data &&
          <h3>Post created, redirecting...</h3>
          ||
          <>
            <div className={styles.formContainer}>
              <input
                className={styles.titleInput}
                type="text"
                placeholder="Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                disabled={loading}
              />
              <textarea
                className={styles.body}
                placeholder="Body"
                cols={10}
                rows={10}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                disabled={loading}
              />
            </div>
            <Box sx={{ '& button': { m: 1, } }}>
              <div>
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
                <Button variant="contained" color="error" onClick={handleCancel} disabled={loading}>Cancel</Button>
              </div>
            </Box>
          </>
        }
      </div>
    </Layout>
  )
}

export default NewPost;
