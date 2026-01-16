const Footer = () => {
  return (
    <footer className="w-full bg-black">
      <div
        className="
          max-w-7xl mx-auto
          flex flex-col md:flex-row
          items-start md:items-center
          md:justify-between
          gap-4
          py-6 px-5 md:px-10
          text-white
        "
      >
        <img
          src="/assets/home/logo-movie.svg"
          alt="Logo Movie"
          className="h-8"
        />

        <h1 className="text-xs md:text-base text-left md:text-right">
          Copyright ©2025 Movie Explorer
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
