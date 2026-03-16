const MapSection = () => {
  return (
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-6">
          Find Us Here
        </h2>
      </div>
      <div className="w-full h-[400px] md:h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31269.16461716!2d78.0239!3d11.0946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babcf0e0e6e0001%3A0x0!2sParamathi%20Velur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Evergreen Traders Location - Paramathi Velur"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>
    </section>
  );
};

export default MapSection;
