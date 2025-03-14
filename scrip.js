let allPosts;
const loadRetro = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    allPosts = data.posts;
    displayRetros(allPosts);
}

function displayRetros(allPosts) {
    console.log(allPosts)
    const allCardContainer = document.getElementById('all-card-container')
    allPosts.forEach((data) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="flex border-2 p-8 lg:w-[600px] rounded-xl mt-10 gap-5 bg-gray-100">
            <div class="indicator">
                <span class="indicator-item badge ${data.isActive ? 'bg-green-500' : 'bg-red-500'}"></span>
                <div class="grid lg:w-20 h-3 bg-white rounded-xl place-items-center">
                    <img class="rounded-xl" src="${data.image}" alt="">
                </div>
            </div>
            <div class="space-y-5">
                <h5 class="text-[#12132D]"># ${data.category} <span class="p-2">Author: ${data.author.name}</span></h5>
                <h2 class="text-2xl font-bold text-[#12132D]">${data.title}</h2>
                <p class="text-[#12132D] mb-5">${data.description}</p>
                <hr>
                <div class="flex justify-between">
                    <div class="space-x-5">
                        <i class="las la-comments"> ${data.comment_count} </i>
                        <i class="las la-eye"> ${data.view_count} </i>
                        <i class="las la-clock"> ${data.posted_time} min</i>
                    </div>
                    <div class="border-2 p-1 rounded-full bg-[#10B981]">
                        <button onclick="handleClick('${data.id}')"><i class="las la-envelope-open"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
        allCardContainer.appendChild(newDiv);
    });
}

const allCard = document.getElementById('title-card');
const handleClick = (id) => {
    const singleData = allPosts.find(element => element.id == id);
    console.log(singleData);
    const div = document.createElement('div');
    div.classList = 'bg-white p-2 rounded-xl mt-5';
    div.innerHTML = `
    <div class="flex justify-between">
        <h1>${singleData.title}</h1>
        <h1><i class="las la-eye"> ${singleData.view_count} </i></h1>
    </div>`;
    allCard.appendChild(div);
}

loadRetro();

const letestProducts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayProduct(data);
}

const displayProduct = (letest) => {
    const letestContainer = document.getElementById('letest-container');
    letest.forEach(letests => {
        const LetestCard = document.createElement('div');
        LetestCard.classList = `card w-96 bg-base-100 shadow-xl mt-10 ml-3`;
        LetestCard.innerHTML = `
            <figure class="border-2 p-6">
                <img src="${letests.cover_image}" alt="" />
            </figure>
            <div class="card-body">
                <i class="las la-calendar-alt"> ${letests.author.posted_date ? letests.author.posted_date : 'No publish date'}</i>
                <h2 class="card-title">What will a Mars habitat force that impact in our daily life?</h2>
                <p>These spacecraft found that although some places on Earth look like Mars, the Red Planet is indeed a harsh environment for life.</p>
                <div class="flex gap-5">
                    <div>
                        <img class="border-2 rounded-full max-h-12" src="${letests.profile_image}" alt="">
                    </div>
                    <div>
                        <h3 class="font-bold">${letests.author.name}</h3>
                        <p>${letests.author.designation ? letests.author.designation : 'Unknown'}</p>
                    </div>
                </div>
            </div>`;
        letestContainer.appendChild(LetestCard);
    });
}

letestProducts();
