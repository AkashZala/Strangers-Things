const MostExpensive = ({ posts }) => {

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

    const post = posts.find(post => {
        if (post.price.includes("$")) {
            return post.price.slice(1) === prices[prices.length - 1]
        } else {
            return post.price === prices[prices.length - 1]
        }
    });

    console.log(post)

    if (!post) {
        return null;
    }
    else {
        return (
            <div>
                <h1>SO EXPENSIVE WOW</h1>
                <h1>{post.title} ({isNaN(post.price * 1) === true ? post.price : `$${(post.price * 1).toFixed(2)}`})</h1>
                <h2>{post.description}</h2>
                <p>Location? {post.location === '[On Request]' ? 'Available Upon Request' : post.location}</p>
            </div>
        );
    }
}

export default MostExpensive;