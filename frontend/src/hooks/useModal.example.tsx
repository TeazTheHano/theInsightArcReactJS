import React, { useState, useRef } from 'react';
import { useModal } from './useModal';
import Button from '../components/Button/Button';
import TextField from '../components/TextInput/TextField';
import { TextLabelLarge } from '../components/TextBox/textBox';

/**
 * Ví dụ sử dụng useModal hook.
 * Component này minh họa cách mở và quản lý nhiều modal độc lập.
 */
const ModalExample: React.FC = () => {
    const { openModal, closeTopModal, closeModalById, clearModals, modalStack } = useModal();
    const [value, setValue] = useState<string>('')
    const [count, setCount] = useState<number>(1)

    const startCount = () => {
        setInterval(() => {
            setCount(c => {
                console.log(c + 1);
                return c + 1;
            });
        }, 500);
    }

    // Hàm mở modal đơn giản
    const handleOpenSimpleModal = () => {
        openModal({
            element: <div>Đây là nội dung modal đơn giản!</div>,
            props: {
                title: 'Modal Đơn Giản',
                sizeMode: 'fit',
                primaryAction: <Button label='close top' onClick={() => closeTopModal()} />
            },
        });
    };

    // Hàm mở modal với nút đóng tùy chỉnh
    // const handleOpenCustomModal = () => {
    //     const modalId = openModal({
    //         element:
    //             (
    //                 <div>
    //                     <p>Count {count}</p>
    //                     <TextLabelLarge children={count} />
    //                     <Button
    //                         label="Đóng Modal Này"
    //                         onClick={() => closeModalById(modalId)}
    //                         styleMode="Outlined"
    //                     />
    //                     <Button
    //                         label='+1 modal'
    //                         onClick={() => handleOpenSimpleModal()}
    //                     />
    //                     <TextField
    //                         onChange={e => setValue(e.target.value)}
    //                     />
    //                     <Button
    //                         label='+c'
    //                         onClick={startCount}
    //                     />
    //                 </div>
    //             )
    //         ,
    //         props: {
    //             title: 'Modal Tùy Chỉnh',
    //             sizeMode: 600,
    //             // topLeftCloseButton: false, // Ẩn nút đóng góc trên trái
    //             contentText: 'Đây là modal với nút đóng tùy chỉnh.'
    //         },
    //     });
    // };

    const DynamicModalContent = ({ count, close }: { count: number, close: () => void }) => (
        <div>
            <p>Count {count}</p>
            <Button label="Đóng" onClick={close} />
        </div>
    );

    const handleOpenCustomModal = () => {
        const modalId = openModal({
            element: <DynamicModalContent count={count} close={() => closeModalById(modalId)} />,
            props: {
                title: 'Modal Tùy Chỉnh',
                sizeMode: 600,
            },
        });
    };


    return (
        <div style={{ padding: '20px' }}>
            <h1>{value} {count}</h1>
            <h2>Ví dụ sử dụng useModal</h2>
            <p>Số modal đang mở: {modalStack.length}</p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Button label="Mở Modal Đơn Giản" onClick={handleOpenSimpleModal} />
                <Button label="Mở Modal Đơn Giản" children="asfasfasdfasdf" variantMode='Icon' leadingIcon="search" onClick={handleOpenSimpleModal} />
                <Button label="Mở Modal Tùy Chỉnh" onClick={handleOpenCustomModal} />

                <Button
                    label='+c'
                    onClick={startCount}
                />
            </div>
        </div>
    );
};

export default ModalExample;
