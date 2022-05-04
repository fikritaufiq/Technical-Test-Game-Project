import blankPhoto from "../../public/icon/Blank.jpg"
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import Image from 'next/image'
import {useState} from "react";
// import {uploadImage} from "../../services/cloudinary";

const ProfileMe = () => {

    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        // Update the state
        this.setState({selectedFile: event.target.files[0]});
    };

    // const onFileUpload = () => {
    //     const formData = new FormData();
    //     formData.append(
    //         "myFile",
    //         file,
    //         file.name
    //     );
    //     console.log(file);
    //     uploadImage(file)
    // };

    const onUploaded = () => {
        if (file) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {file.name}</p>
                    <p>File Type: {file.type}</p>
                    <p>
                        Last Modified:{" "}
                        {file.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    const {email, username, name, bio, profilePhoto} = useSelector(
        userSelector
    );

    return (
        <div>
            <h1>
                Profile Anda
            </h1>
            <h4>Username: {username}</h4>
            <h4>Email: {email}</h4>
            {profilePhoto ? <Image
                src={profilePhoto}
                alt="ProfilePhoto"
                style={{width: '256px', height: '256px'}}
            /> : <Image
                src={blankPhoto}
                alt="ProfilePhoto"
                style={{width: '256px', height: '256px'}}
            />}
            <div>
                {/*<input type="file" onChange={onFileChange}/>*/}
                {/*<button onClick={onFileUpload}>*/}
                {/*    Upload!*/}
                {/*</button>*/}
            </div>
            {/*{onUploaded()}*/}
            <h4>Nama: {name}</h4>
            <h4>Bio: {bio}</h4>
        </div>
    );
}

export default ProfileMe;