function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

module.exports = { formatDate };
