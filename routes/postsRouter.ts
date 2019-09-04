import { Router } from 'express';

import * as db from '../data/db';

export const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await db.find();
    if (response !== undefined) {
      res.status(200).json(response);
    } else {
      res.status(404).send('no posts found');
    }
  } catch (error) {
    res.status(500).send('error getting posts');
  }
});

router.post('/', async (req, res) => {
  const { title, contents } = req.body;

  if (title === undefined || contents === undefined) {
    res.status(400).send('must provide title and contents');
    return;
  }

  try {
    const response = await db.insert({ title, contents });
    if (response !== undefined) {
      res.status(200).json(response);
    } else {
      res.status(500).send('no id generated while adding post');
    }
  } catch (error) {
    res.status(500).send('error adding post');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await db.findById(id);
    if (response !== undefined && response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).end();
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  let task = 'updating post';

  if (title === undefined && contents === undefined) {
    res.status(400).send('must provide title or contents');
    return;
  }

  try {
    const putResponse = await db.update(id, { title, contents });
    if (putResponse !== undefined) {
      task = 'getting updated post';
      const getResponse = await db.findById(id);
      if (getResponse !== undefined && getResponse.length > 0) {
        res.status(200).json(getResponse);
      } else {
        res.status(500).send('unable to get updated post');
      }
    } else {
      res.status(500).send('no id generated while adding post');
    }
  } catch (error) {
    res.status(500).send(`error ${task}`);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await db.findById(id);
    if (posts !== undefined && posts.length > 0) {
      const deletedPostsCount = await db.remove(id);
      if (posts.length === deletedPostsCount) {
        res.status(200).json(posts);
      } else {
        res.status(500).send(`error deleting posts with id ${id}`);
      }
    } else {
      res.status(404).send(`no posts found with id ${id}`);
    }
  } catch (error) {
    res.status(500).send(`error deleting posts with id ${id}`);
  }
});

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await db.findPostComments(id);
    if (response !== undefined && response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).send(`no comments on post ${id}`);
    }
  } catch (error) {
    res.status(500).send('error getting comments');
  }
});

router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (text === undefined) {
    res.status(400).send('must provide comment');
    return;
  }

  const comment = {
    post_id: id,
    text,
  };

  try {
    const response = await db.insertComment(comment);
    if (response !== undefined) {
      res.status(200).json(response);
    } else {
      res.status(500).send(`error adding comment to id ${id}`);
    }
  } catch (error) {
    res.status(500).send(`error adding comment to id ${id}`);
  }
});

// module.exports = router;

export default router;
