import React, {Component} from 'react';
import axios from 'axios';

 class FileInput extends Component {
    state ={
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    
    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        console.log(fd);
        
        axios.post('http://localhost:4000/business/add', fd, {
            onUploadProgress: progressEvent => {
             console.log('Upload Progress:' + (progressEvent.loaded / progressEvent.total * 100)+ '%')   
            }
    })
    .then(res => {
        console.log(res);
        
    })
}

    

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
            
        
    }
}

export default FileInput;