getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    for (item of data) {
        const root = document.createElement('ul');
        const name = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        name.textContent = `name: ${item.name}`;
        geo.textContent = `${item.lat}, ${item.lon}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;

        root.append(name, geo, date);
        document.body.appendChild(root);

    }
}