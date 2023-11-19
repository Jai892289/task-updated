import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPostData } from './redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faFileAudio, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './New.css';

const New = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialFormData = {
        title: '',
        description: '',
        image: null,
        video: null,
        audio: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [additionalTextAreas, setAdditionalTextAreas] = useState([]);
    const [changesMade, setChangesMade] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setChangesMade(true);
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            [fileType]: file,
        });
        setChangesMade(true);
    };

    const handleAdditionalTextAreaChange = (e, index) => {
        const { value } = e.target;
        setAdditionalTextAreas((prevAreas) =>
            prevAreas.map((area, i) => (i === index ? value : area))
        );
        setChangesMade(true);
    };

    // const handleAddTextArea = () => {
    //     setAdditionalTextAreas((prevAreas) => [...prevAreas, '']);
    // };

    const handleAddTextArea = () => {
        setAdditionalTextAreas((prevAreas) => [...prevAreas, '']);
        setChangesMade(true);
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formDataToSend = new FormData();

    //     formDataToSend.append('title', formData.title);
    //     formDataToSend.append('description', formData.description);
    //     formDataToSend.append('image', formData.image);
    //     formDataToSend.append('video', formData.video);
    //     formDataToSend.append('audio', formData.audio);

    //     additionalTextAreas.forEach((text, index) => {
    //         formDataToSend.append(`additionalText${index}`, text);
    //     });

    //     try {
    //         await dispatch(getAllPostData(formDataToSend));
    //         setFormData(initialFormData);
    //         setAdditionalTextAreas([]);
    //         setChangesMade(false);
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('video', formData.video);
        formDataToSend.append('audio', formData.audio);

        additionalTextAreas.forEach((text, index) => {
            formDataToSend.append(`additionalText${index}`, text);
        });

        try {
            await dispatch(getAllPostData(formDataToSend));
            setFormData(initialFormData);
            setAdditionalTextAreas([]);
            setChangesMade(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (changesMade) {
                const message =
                    'Are you sure you want to leave? Your changes may not be saved.';
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [changesMade]);

    const handleNavigation = () => {
        if (
            !changesMade ||
            window.confirm('Are you sure you want to discard the note and leave?')
        ) {
            navigate('/');
        }
    };


    return (
        <div>
            <form className="custom-form" onSubmit={handleSubmit}>
                <div>
                    <button type="submit" style={{ marginBottom: '20px' }}>
                        Save
                    </button>
                    <FontAwesomeIcon onClick={handleNavigation} icon={faArrowLeft} />
                </div>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                />

                <textarea
                    className="text-area"
                    name="description"
                    placeholder="Start Writing ..."
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={handleAddTextArea} >
                    +
                </button>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <label htmlFor="videoUpload" className="file-label">
                        <FontAwesomeIcon icon={faVideo} />
                        <input
                            type="file"
                            id="videoUpload"
                            accept="video/*"
                            onChange={(e) => handleFileChange(e, 'video')}
                            style={{ display: 'none' }}
                        />
                        {formData.video && <p>{formData.video.name}</p>}
                    </label>
                    <label htmlFor="audioUpload" className="file-label">
                        <FontAwesomeIcon icon={faFileAudio} />
                        <input
                            type="file"
                            id="audioUpload"
                            accept="audio/*"
                            onChange={(e) => handleFileChange(e, 'audio')}
                            style={{ display: 'none' }}
                        />
                        {formData.audio && <p>{formData.audio.name}</p>}
                    </label>
                    <label htmlFor="imageUpload" className="file-label">
                        <FontAwesomeIcon icon={faFileImage} />
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'image')}
                            style={{ display: 'none' }}
                        />
                        {formData.image && <p>{formData.image.name}</p>}
                    </label>
                </div>

                {additionalTextAreas.map((text, index) => (
                    <textarea
                        key={index}
                        className="text-area"
                        placeholder={`Additional Text ${index + 1}`}
                        value={text}
                        onChange={(e) => handleAdditionalTextAreaChange(e, index)}
                    />
                ))}
            </form>

            <div></div>
        </div>
    );
};

export default New;




