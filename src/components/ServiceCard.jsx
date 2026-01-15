export default function ServiceCard({ title, description, icon, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />

      <div className="content">
        <div className="title">
          <span dangerouslySetInnerHTML={{ __html: icon }} />
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 30px rgba(0,0,0,0.15);
        }

        img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .content {
          padding: 1.4rem;
          border-top: 4px solid #1568A7;
        }

        .title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        h3 {
          margin: 0;
        }

        p {
          margin-top: 0.8rem;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}
