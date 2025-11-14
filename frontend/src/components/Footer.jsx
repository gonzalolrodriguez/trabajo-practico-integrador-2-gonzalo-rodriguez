const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: '#fff', textAlign: 'center', padding: '16px 0 12px', borderTop: 'none', marginTop: 16, boxShadow: '0 -2px 12px #c3cfe2' }}>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: 1 }}>&copy; {currentYear} - Gonzalo Rodríguez</div>
        </footer>
    );
};

export default Footer;
