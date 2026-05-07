const WaveDivider = ({ flip = false }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
    <svg
      className="relative block w-full h-[60px] md:h-[80px]"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C240,80 480,100 720,80 C960,60 1200,100 1440,60 L1440,100 L0,100 Z"
        fill="currentColor"
      />
    </svg>
  </div>
)

export default WaveDivider
