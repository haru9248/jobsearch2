import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import '../css/PostJob.css';
interface Category {
    id:number;
    name: string;
}

const PostJob: React.FC = () => {
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const navigate = useNavigate();

    useEffect(()=> {
        const fetchCategories = async ()=>{
            try {
                const response = await axiosClient.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        if (!title || !salary || !categoryId) {
            alert('すべての項目を入力してください');
            return;
        }

        const sanitizedSalary = parseInt(
            salary.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0)
        )
        .replace(/[^\d]/g, ''),
        10
        );
        
        console.log(sanitizedSalary);
        if (isNaN(sanitizedSalary)) {
            alert('年収の入力が必要です');
            return;
        }

        try {
            const response = await axiosClient.post('/jobs', {
                title,
                salary: sanitizedSalary,
                category_id: categoryId,
            });
            alert('求人が投稿されました!');
            navigate('/');
        } catch (error) {
            console.error('Error posting job:', error);
            alert('求人投稿中にエラーが発生しました。');
        }
    };

    return (
        <div className="post-container">
            <h2>求人投稿</h2>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>
                    求人カテゴリ選択
                    </label>
                    <select
                    value={categoryId ?? ''}
                    onChange={(e)=> setCategoryId(Number(e.target.value))}
                    required
                    >
                        <option value="">カテゴリを選択　▼</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>
                        年収(万円)
                        </label>
                        <input
                        type="text"
                        value={salary}
                        onChange={(e)=> setSalary(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <label>
                        求人タイトル
                        </label>
                        <input
                        type="text"
                        className="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>
                <button type="submit">投稿</button>
            </form>
        </div>
    );
};

export default PostJob;