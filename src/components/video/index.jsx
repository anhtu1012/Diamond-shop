export default function VideoEmbed() {
  const videoUrl =
    "https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/home-page-banner-2.mp4?alt=media&token=e6cb5dc2-3fe1-4f53-859d-d16f21f3310e";

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "26.25%", 
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
        background: "#000",
      }}
    >
      <video
        src={videoUrl}
        style={{
         position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%)",
          objectFit: "cover"
        }}
        frameBorder="0"
        autoPlay
        loop
        muted
        playsInline
        title="Video"
      />
    </div>
  );
}
