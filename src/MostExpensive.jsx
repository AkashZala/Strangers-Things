import Post from "./Post";

const MostExpensive = ({ posts, auth, deletePost, updatePost }) => {
    if (!posts) {
        return null;
    }
    const prices = posts.map(post => {
        if (post.price.includes("$")) {
            return post.price.slice(1);
        } else {
            return post.price;
        }
    })
        .filter((price) => {
            return !isNaN(price * 1)
        })
        .sort((a, b) => {
            return a - b
        })

    const expensivePost = posts.find(post => {
        if (post.price.includes("$")) {
            return post.price.slice(1) === prices[prices.length - 1]
        } else {
            return post.price === prices[prices.length - 1]
        }
    });

    if (!expensivePost) {
        return null;
    } else {
        const expId = expensivePost._id;

        return (
            <div id='mostExpensive'>
                <h1>Today's Most Expensive Post</h1>
                <Post posts={posts} auth={auth} deletePost={deletePost} updatePost={updatePost} expId={expId} />
            </div>
        );
    }
}

export default MostExpensive;