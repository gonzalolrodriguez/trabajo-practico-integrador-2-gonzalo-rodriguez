const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', textAlign: 'center', padding: '28px 0 20px', borderTop: 'none', marginTop: 48, boxShadow: '0 -2px 12px #c3cfe2' }}>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: 1 }}>&copy; {currentYear} - Gonzalo Rodríguez</div>
        </footer>
    );
};

export default Footer;
