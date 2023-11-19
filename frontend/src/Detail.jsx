import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { updateData, deleteData } from './redux/action';
import { deleteDataSuccess } from './redux/action';

import './DetailPage.css';

const DetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedItem = useSelector(state => state.itemData.items.find(item => item._id === id));

    const [editedData, setEditedData] = useState({
        title: selectedItem.title,
        description: selectedItem.description,
        additionalText: selectedItem.additionalText || [], 
    });

    useEffect(() => {
        console.log("selectedItem", selectedItem);
        setEditedData({
            title: selectedItem.title,
            description: selectedItem.description,
            additionalText: selectedItem.additionalText || [],
        });
    }, [id, selectedItem]);

    const forceUpdate = () => {
        setEditedData({ ...editedData });
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    const imageSrc = selectedItem.image ? `data:image/png;base64,${arrayBufferToBase64(selectedItem.image.data)}` : null;
    const videoSrc = selectedItem.video ? `data:video/mp4;base64,${arrayBufferToBase64(selectedItem.video.data)}` : null;
    const audioSrc = selectedItem.audio ? `data:audio/mp3;base64,${arrayBufferToBase64(selectedItem.audio.data)}` : null;

    const handleSave = async () => {
        await dispatch(updateData(id, editedData));
    };

    const handleDeleteImage = async () => {
        await dispatch(deleteData(id, 'image'));
        dispatch(deleteDataSuccess(id, 'image'));

        setEditedData({
            ...editedData,
            image: null,
        });

        forceUpdate();
    };

    const handleDeleteVideo = async () => {
        await dispatch(deleteData(id, 'video'));
        dispatch(deleteDataSuccess(id, 'video'));
        setEditedData({
            ...editedData,
            video: null,
        });
        forceUpdate();
    };

    const handleDeleteAudio = async () => {
        await dispatch(deleteData(id, 'audio'));
        dispatch(deleteDataSuccess(id, 'audio'));
        setEditedData({
            ...editedData,
            audio: null,
        });
        forceUpdate();
    };

    if (!selectedItem) {
        return <div className="detail-page not-found">Item not found</div>;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Item Details</h2>
            <FontAwesomeIcon onClick={() => navigate("/")} icon={faArrowLeft} />

            <div className="detail-page-container">
                <button onClick={handleSave} style={{ marginBottom: '10px' }}>Save</button>

                <input
                    type="text"
                    className="input-field"
                    value={editedData.title}
                    onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                />
                <textarea
                    className="input-field"
                    value={editedData.description}
                    onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                />
                {editedData.additionalText.map((text, index) => (
                    <textarea
                        key={index}
                        className="input-field"
                        placeholder={`Additional Text ${index + 1}`}
                        value={text}
                        onChange={(e) => {
                            const updatedAdditionalText = [...editedData.additionalText];
                            updatedAdditionalText[index] = e.target.value;
                            setEditedData({
                                ...editedData,
                                additionalText: updatedAdditionalText,
                            });
                        }}
                    />
                ))}

                <div style={{ textAlign: 'center' }}>
                    {selectedItem.image && (
                        <div>
                            <img
                                src={imageSrc}
                                alt="Item"
                                style={{ maxWidth: '100%', height: '250px', width: '100%' }}
                            />
                            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={handleDeleteImage} />
                        </div>
                    )}

                    {selectedItem.video && (
                        <div>
                            <video controls width="100%" >
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={handleDeleteVideo} />
                        </div>
                    )}

                    {selectedItem.audio && (
                        <div>
                            <audio controls >
                                <source src={audioSrc} type="audio/mp3" />
                                Your browser does not support the audio tag.
                            </audio>
                            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={handleDeleteAudio} />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DetailPage;


