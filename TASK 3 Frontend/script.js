document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const apiUrl = 'http://localhost:3030/categories'; 
    const container = document.getElementById('category-container');

    
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const firstField = form.querySelector('input[placeholder="First Field"]').value;
        const secondField = form.querySelector('input[placeholder="Second Field"]').value;

        try {
            const response = await axios.post(apiUrl, {
                name: firstField, 
                description: secondField 
            });
            console.log('Kategori eklendi:', response.data);
            fetchCategories(); 
        } catch (error) {
            console.error('Hata:', error);
        }
    });

    
    async function fetchCategories() {
        try {
            const response = await axios.get(apiUrl);
            const categories = response.data;

            console.log('Categories fetched:', categories); 

            container.innerHTML = ''; 

            categories.forEach(category => {
                const cardHTML = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Image for ${category.name}">
                            <div class="card-body">
                                <h5 class="card-title">${category.name}</h5>
                                <p class="card-text">${category.description}</p>
                                <button class="btn btn-danger delete-btn" data-id="${category._id}">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });

            
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async function() {
                    const id = button.getAttribute('data-id');
                    console.log(id)
                    try {
                        await axios.delete(`${apiUrl}/${id}`);
                        console.log('Kategori silindi:', id);
                        fetchCategories(); 
                    } catch (error) {
                        console.error('Hata:', error);
                    }
                });
            });

        } catch (error) {
            console.error('Hata:', error);
        }
    }

    fetchCategories();
});

