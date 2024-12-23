export const Background = () => {
  return (
    <>
      <div 
        className="fixed inset-0 flex items-start justify-center pointer-events-none select-none z-0"
        style={{ paddingTop: '25vh' }}
      >
        <span 
          className="font-black whitespace-nowrap bg-clip-text text-center w-full"
          style={{
            fontSize: "17vw",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-noto-sans)",
            display: "inline-block",
            fontWeight: 900,
            background: `linear-gradient(
              135deg,
              var(--gradient-from) 0%,
              var(--gradient-to) 100%
            )`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >有咩帮到你？
        </span>
      </div>
    </>
  );
};