import { useState, useCallback, memo } from 'react';

// Component con được tối ưu hóa bằng React.memo
// Nó sẽ chỉ re-render nếu các props của nó thay đổi
interface MyButtonProps {
    onClick: () => void;
    label: string;
}

// Sử dụng memo để ghi nhớ component.
// React sẽ chỉ re-render MyButton nếu props.onClick HOẶC props.label thay đổi.
const MyButton = memo(({ onClick, label }: MyButtonProps) => {
    console.log(`MyButton "${label}" re-rendered`);
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                margin: '5px',
                fontSize: '1em',
                cursor: 'pointer',
                borderRadius: '5px',
                border: '1px solid #007bff',
                backgroundColor: '#e0f7fa',
                color: '#007bff'
            }}
        >
            {label}
        </button>
    );
});

function ParentComponent() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // Hàm này KHÔNG được memoize. Nó sẽ được tạo lại mỗi khi ParentComponent re-render.
    const handleClickWithoutCallback = () => {
        console.log('Button without useCallback clicked!');
        setCount(prevCount => prevCount + 1);
    };

    // Hàm này được memoize bằng useCallback.
    // Nó CHỈ được tạo lại khi 'count' thay đổi.
    const handleClickWithCallback = useCallback(() => {
        console.log('Button with useCallback clicked!');
        setCount(prevCount => prevCount + 1);
    }, [count]); // Phụ thuộc vào 'count'

    // Hàm này cũng được memoize, nhưng không có phụ thuộc.
    // Nó CHỈ được tạo lại MỘT LẦN duy nhất khi component mount.
    const handleReset = useCallback(() => {
        console.log('Reset button clicked!');
        setCount(0);
    }, []); // Mảng phụ thuộc rỗng

    console.log('ParentComponent re-rendered');

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '50px auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
            <h1>Ví dụ về useCallback và React.memo</h1>
            <p style={{ fontSize: '1.5em', marginBottom: '15px' }}>
                Số lượt đếm: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{count}</span>
            </p>

            {/* Input để gây re-render ParentComponent mà không thay đổi 'count' */}
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nhập gì đó để re-render cha"
                style={{
                    padding: '8px',
                    fontSize: '1em',
                    marginBottom: '20px',
                    width: 'calc(100% - 160px)',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {/* MyButton này sẽ re-render MỌI LÚC khi ParentComponent re-render,
                    vì handleClickWithoutCallback luôn là một hàm mới. */}
                <MyButton label="Click (Không useCallback)" onClick={handleClickWithoutCallback} />

                {/* MyButton này CHỈ re-render khi 'count' thay đổi,
                    vì handleClickWithCallback chỉ thay đổi khi 'count' thay đổi. */}
                <MyButton label="Click (Có useCallback)" onClick={handleClickWithCallback} />

                {/* MyButton này CHỈ re-render MỘT LẦN duy nhất khi component mount,
                    vì handleReset không có phụ thuộc. */}
                <MyButton label="Reset (Có useCallback rỗng)" onClick={handleReset} />
            </div>

            <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
                Quan sát console để thấy khi nào các nút con re-render.
            </p>
        </div>
    );
}

export default ParentComponent;
