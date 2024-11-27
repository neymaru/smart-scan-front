import { useState } from 'react';
import './DatasetModal.css';

const DatasetModal = ({ isOpen, onClose }) => {
  const [imageCount, setImageCount] = useState(1);
  const [fileName, setFileName] = useState('이미지를 선택해주세요');
  const [isClosing, setIsClosing] = useState(false);
  const [clickStartTarget, setClickStartTarget] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    // 데이터셋 생성 로직 구현 예정
    console.log('이미지 수:', imageCount);
    onClose();
  };

  const handleOverlayMouseDown = (e) => {
    setClickStartTarget(e.target.className);
  };

  const handleOverlayMouseUp = (e) => {
    if (clickStartTarget === 'modal-overlay') {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 400);
    }
    setClickStartTarget(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
    >
      <div className={`modal-content ${isClosing ? 'slide-out' : ''}`}>
        <div className="modal-header">
          <h2>데이터셋 생성</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="input-section">
            <label className="input-label">원본 이미지</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="dataset-image"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="dataset-image" className="file-label">
                <span className="upload-icon">📁</span>
                <span className="file-name">{fileName}</span>
              </label>
            </div>
          </div>

          <div className="input-section">
            <label className="input-label">생성할 이미지 수</label>
            <div className="number-input-wrapper">
              <input
                type="number"
                min="1"
                max="100"
                value={imageCount}
                onChange={(e) => setImageCount(e.target.value)}
                className="number-input"
              />
              <span className="number-suffix">장</span>
            </div>
          </div>
        </div>
        <p className="info-text">
          ＊ 무작위 방향으로 회전, 텍스트가 입력된 샘플 데이터셋이 생성됩니다.
        </p>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button className="create-button" onClick={handleSubmit}>생성</button>
        </div>
      </div>
    </div>
  );
};

export default DatasetModal; 
