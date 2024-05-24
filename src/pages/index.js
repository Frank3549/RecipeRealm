import Link from "next/link"; // Import Link from Next.js

function Home() {
  return (
    <div>
      <h1>Welcome to My Recipe App</h1>
      <Link href="/CreateRecipePage">
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="button">Your Recipes</button>
      </Link>
      <style jsx>{`
        .button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default Home;
