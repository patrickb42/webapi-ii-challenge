import { Router } from 'express';

import * as db from '../data/db';

export const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await db.find();
    return (response !== undefined)
      ? res.status(200).json(response)
      : res.status(404).send('no posts found');
  } catch (error) {
    return res.status(500).send('error getting posts');
  }
});

router.post('/', async (req, res) => {
  const { title, contents } = req.body;

  if (title === undefined || contents === undefined) {
    return res.status(400).send('must provide title and contents');
  }

  try {
    const response = await db.insert({ title, contents });
    return (response !== undefined)
      ? res.status(200).json(response)
      : res.status(500).send('no id generated while adding post');
  } catch (error) {
    return res.status(500).send('error adding post');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [response] = await db.findById(id);
    return (response !== undefined)
      ? res.status(200).json(response)
      : res.status(404).send(`no posts with the id ${id}`);
  } catch (error) {
    return res.status(500).end('error getting post');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  let task = 'updating post';

  if (title === undefined && contents === undefined) {
    return res.status(400).send('must provide title or contents');
  }

  try {
    const putResponse = await db.update(id, { title, contents });
    if (putResponse !== undefined) {
      task = 'getting updated post';
      const [getResponse] = await db.findById(id);
      return (getResponse !== undefined)
        ? res.status(200).json(getResponse)
        : res.status(500).send('unable to get updated post');
    }
    return res.status(500).send('no id generated while adding post');
  } catch (error) {
    return res.status(500).send(`error ${task}`);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [post] = await db.findById(id);
    if (post !== undefined) {
      const deletedPostsCount = await db.remove(id);
      return (deletedPostsCount === 1)
        ? res.status(200).json(post)
        : res.status(500).send(`error deleting posts with id ${id}`);
    }
    return res.status(404).send(`no posts found with id ${id}`);
  } catch (error) {
    return res.status(500).send(`error deleting posts with id ${id}`);
  }
});

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await db.findPostComments(id);
    return (response !== undefined && response.length > 0)
      ? res.status(200).json(response)
      : res.status(404).send(`no comments on post ${id}`);
  } catch (error) {
    return res.status(500).send('error getting comments');
  }
});

router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (text === undefined) {
    return res.status(400).send('must provide comment');
  }

  const comment = {
    post_id: id,
    text,
  };

  try {
    const response = await db.insertComment(comment);
    return (response !== undefined)
      ? res.status(200).json(response)
      : res.status(500).send(`error adding comment to id ${id}`);
  } catch (error) {
    return res.status(500).send(`error adding comment to id ${id}`);
  }
});

export default router;
