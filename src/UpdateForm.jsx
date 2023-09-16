import { useState, useEffect } from 'react'

const UpdateForm = ({ id, posts, updatePost }) => {
    const post = posts.find(post => post._id === id);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const post = posts.find(post => post._id === id)
        if (post) {
            setTitle(post.title);
            setDescription(post.description)
            setPrice(post.price)
            setLocation(post.location)
            setError('')
        }
    }, [posts, id]);

    if (!post) {
        return null;
    }

    const saveUpdate = async (event) => {
        event.preventDefault();
        const post = { id, title, description, price, location };
        try {
            await updatePost(post);
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div className='updatePost'>
            <form onSubmit={saveUpdate}>
                {
                    error ? JSON.stringify(error, null, 2) : null
                }
                <input
                    name={'title'}
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    placeholder='Update Title'
                />
                <input
                    name={'description'}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder='Update Description'
                />
                <input
                    name={'price'}
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    placeholder='Update Price'
                />
                <input
                    name={'location'}
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    placeholder='Update Location' />

                <button type='submit'>Update Post</button>
            </form>
        </div >
    );
};

export default UpdateForm;
