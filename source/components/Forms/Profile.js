// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { profileActionsAsync } from '../../bus/profile/saga/asyncActions';
import { validateLength } from '../../instruments/validators';
import { book } from '../../navigation/book';

// Components
import { Input } from '../../components';

const mapState = (state) => {
    return {
        isFetching: state.ui.get('isFetching'),
        profile:    state.profile,
    };
};

const mapDispatch = {
    updateNameAsync:   profileActionsAsync.updateNameAsync,
    updateAvatarAsync: profileActionsAsync.updateAvatarAsync,
};

@connect(
    mapState,
    mapDispatch,
)
export default class Profile extends Component {
    _submitUserInfo = (userInfo) => {
        const { updateNameAsync, updateAvatarAsync } = this.props;

        if (userInfo.avatar.length) {
            const { avatar } = userInfo;

            updateAvatarAsync(avatar);
        }

        const { firstName, lastName } = userInfo;

        updateNameAsync({ firstName, lastName });
    };

    render () {
        const { profile, isFetching } = this.props;

        const buttonStyle = cx(Styles.loginSubmit, {
            [Styles.disabledButton]: isFetching,
        });

        return (
            <Form
                className = { Styles.form }
                model = 'forms.user.profile'
                onSubmit = { this._submitUserInfo }>
                <div className = { Styles.wrapper }>
                    <div>
                        <h1>Welcome, {profile.get('firstName')}</h1>
                        <img src = { profile.get('avatar') } />
                        <Control.file
                            className = { Styles.fileInput }
                            disabled = { isFetching }
                            id = 'file'
                            model = 'forms.user.profile.avatar'
                            name = 'file'
                        />
                        <label htmlFor = 'file'>Choose new avatar</label>
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInput }
                            id = 'forms.user.profile.firstName'
                            invalidStyle = { Styles.invalid }
                            model = 'forms.user.profile.firstName'
                            placeholder = 'First name'
                            validators = { {
                                valid: (name) => !validateLength(name, 1),
                            } }
                        />
                        <Input
                            disabled = { isFetching }
                            disabledStyle = { Styles.disabledInput }
                            id = 'forms.user.profile.lastName'
                            invalidStyle = { Styles.invalid }
                            model = 'forms.user.profile.lastName'
                            placeholder = 'Last name'
                            validators = { {
                                valid: (lastName) => !validateLength(lastName, 1),
                            } }
                        />
                        <button
                            className = { buttonStyle }
                            disabled = { isFetching }
                            type = 'submit'>
                            {isFetching ? 'Working...' : 'Update Profile'}
                        </button>
                    </div>
                    <Link to = { book.newPassword }>change password →</Link>
                </div>
            </Form>
        );
    }
}
