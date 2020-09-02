import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileNmae: ''
        }
    }
    
    handleFormSubmit = (e) => {
        //Data가 서버로 전송될때 오류가 발생되지 않게 하는 함수
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                //고객추가 후 수행할수 있게 여기에 위치시킴
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileNmae: ''
        })
        //this.props.stateRefresh();
        //window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileNmae: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState ={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config ={
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render () {
        return (
            <form onSubmit = {this.handleFormSubmit}>
                <h1>고객추가</h1>
                프로필이미지: 
                <input type="file" name="file" file={this.state.file} value={this.state.fileNmae} 
                    onChange={this.handleFileChange} /><br/>
                이름: 
                <input type="text" name="userName" value={this.state.userName} 
                    onChange={this.handleValueChange} /><br/>
                생년월일: 
                <input type="text" name="birthday" value={this.state.birthday} 
                    onChange={this.handleValueChange} /><br/>
                성별: 
                <input type="text" name="gender" value={this.state.gender} 
                    onChange={this.handleValueChange} /><br/>
                직업: 
                <input type="text" name="job" value={this.state.job} 
                    onChange={this.handleValueChange} /><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;
