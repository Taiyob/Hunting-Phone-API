const loadPhone = async (searchTxt,isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTxt}`);
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 9 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
    if(!isShowAll){
        phones = phones.slice(0,9);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-4 bg-teal-50 shadow-xl';
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick="handleShowDetail('${phone.slug}');" class="btn btn-primary">Show Details</button>
            </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p>
            <span>Storage:</span>
            ${phone?.mainFeatures?.storage}
        </p>
        <p>
            <span>GPS:</span>
            ${phone?.others?.GPS || 'No GPS'}
        </p>
    `;
    show_details_modal.showModal();
}

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,isShowAll);
    searchField.value = '';
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () =>{
    handleSearch(true);
}
