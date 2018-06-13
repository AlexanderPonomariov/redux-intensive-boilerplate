// Core
import { put, call, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* callUpdateAvatarWorker ({ payload: [avatar] }) {
    try {
        yield put(uiActions.setFetchingState(true));

        const avatarFormData = yield new FormData();

        yield call([avatarFormData, avatarFormData.append], 'avatar', avatar);

        const response = yield apply(api, api.profile.updateAvatar, [
            avatarFormData
        ]);

        const {
            data: { avatar: newAvatar },
            message,
        } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield delay(1000);
        yield put(profileActions.updateAvatar(newAvatar));
        yield put(actions.reset('forms.user.profile.avatar'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'update avatar worker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}