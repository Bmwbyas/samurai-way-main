import React, {ChangeEvent} from 'react';


export class ProfileStatus extends React.Component {
    state = {
        status: '',
        editStatus: false
    }
    activateEditMode = () => {
        this.state.editStatus=true
        this.forceUpdate()
    }

    disableEditMode() {
        this.setState({
            editStatus: false
        })

    }

    changeInputStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {this.state.editStatus
                    ? <input value={this.state.status}
                             autoFocus={true}
                             onChange={this.changeInputStatus}
                             onBlur={this.disableEditMode.bind(this)}
                    />
                    : <div onDoubleClick={this.activateEditMode}><span>{this.props.status}</span></div>}
            </div>
        );
    };
}
