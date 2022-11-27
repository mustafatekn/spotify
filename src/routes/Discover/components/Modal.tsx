import { Component } from 'react'

interface ModalProps {
    show: boolean
}

export default class Modal extends Component<ModalProps> {
    redirectUser() {
        window.location.href = `${process.env.REACT_APP_SPOTIFY_AUTH_URL}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${'token'}`
    }

    render() {
        const { show } = this.props;
        if (!show) return false;
        return (
            <div className='modal'>
                <div className='description'>Currently, you can't see the content. Please login with Spotify to see it.</div>
                <div className='linkWrapper'>
                    <button type="button" onClick={() => this.redirectUser()}>
                        Login with Spotify
                    </button>
                </div>
            </div>
        )
    }
}
