import { all, put, call, takeEvery } from 'redux-saga/effects'
import {
  requestPosts,
  requestAddPost,
  requestEditPost,
  requestDeletePosts,
  requestSuccess,
  requestError
} from './actions'
import { Post } from '../utils/interfaces'

const host = process.env.API_HOST || 'http://localhost:5000'

export function* fetchPostsAsync() {
  try {
    yield put(requestPosts());
    const data = yield call(() => {
      return fetch(`${host}/api/list`)
        .then(res => res.json())
      }
    )
    yield put(requestSuccess(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchAddPostAsync(action: any) {
  const post: Post = action.payload

  try {
    yield put(requestAddPost());
    const data = yield call(async () => {
      return await fetch(`${host}/api/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
          })
        .then(res => res.json())
      }
    )
    if (Array.isArray(data))
      yield put(requestSuccess(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchEditPostAsync(action: any) {
  const post: Post = action.payload

  try {
    yield put(requestEditPost());
    const data = yield call(async () => {
      return await fetch(`${host}/api/edit/${post._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
          })
        .then(res => res.json())
      }
    )
    if (Array.isArray(data))
      yield put(requestSuccess(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchDeletePostsAsync(action: any) {
  const ids: string[] = action.payload.filter((id: string) => id)

  try {
    yield put(requestDeletePosts());
    const data = yield call(async () => {
      return await fetch(`${host}/api/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ids)
          })
        .then(res => res.json())
      }
    )
    if (Array.isArray(data))
      yield put(requestSuccess(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* rootSaga() {
  yield all([
    takeEvery('FETCHED_POSTS', fetchPostsAsync)
  ])
  yield all([
    takeEvery('ADD_POST', fetchAddPostAsync)
  ])
  yield all([
    takeEvery('EDIT_POST', fetchEditPostAsync)
  ])
  yield all([
    takeEvery('DELETE_POSTS', fetchDeletePostsAsync)
  ])
}