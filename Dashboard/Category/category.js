document.addEventListener("DOMContentLoaded", async () => {
    try{
        const token = getToken()
        const categories = await getAllCategories(token);
        console.log(categories.data);
        await populateCategories(categories);

        const tableBody = document.querySelector("#table-body");


        const submit = document.querySelector("#submit-btn");
        const categoryName = document.querySelector("#category-name");
        const categoryDescription = document.querySelector("#category-description");

        if(submit)
        {
            submit.addEventListener("click", async (e) => {
                e.preventDefault();

                const categoryDate = {
                    categoryName : categoryName.value,
                    categoryDescription : categoryDescription.value
                }

                const result = await addCategory(categoryDate, token);
                console.log(result);

                if(result.status)
                {
                    Swal.fire({
                        title: "Success!",
                        text: "Category added successfully",
                        icon: "success"
                    });
                    const categories = await getAllCategories(token);
                    await populateCategories(categories);
                }
            })
        }

        if(tableBody)
        {
            tableBody.addEventListener("click", async (event) => {
                if (event.target && event.target.matches(".delete-btn")) {
                    const deleteCategoryBtn = event.target;
                    const categoryId = deleteCategoryBtn.dataset.id;
        
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const resp = await deleteJournal(token, categoryId);
        
                            if (!resp.status) {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to delete the journal.",
                                    icon: "error"
                                });
                            } else {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The journal has been deleted.",
                                    icon: "success"
                                });
                                await populateCategories(token);
                            }
                        }
                    });
                }

                if (event.target && event.target.matches(".update-btn")) {
                    const deleteCategoryBtn = event.target;
                    const categoryId = deleteCategoryBtn.dataset.id;

                    const categoryNameText = document.querySelector("#category-name");
                    const categoryDescriptionText = document.querySelector("#category-description");


                    const objectData = {
                        categoryId: categoryId,
                        categoryName: categoryNameText.value,
                        categoryDescription: categoryDescriptionText.value
                    }

                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const resp = await updateJournal(token, objectData);
        
                            if (!resp.status) {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to delete the journal.",
                                    icon: "error"
                                });
                            } else {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The journal has been deleted.",
                                    icon: "success"
                                });
                                await populateCategories(token);
                            }
                        }
                    });
                }
            })
        }
        
    }
    catch(error)
    {
        console.error(error);
    }
})




async function getAllCategories(token)
{
    const response = await fetch("https://localhost:7240/api/Category/AllCategories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if(response.ok)
    {
        const data = await response.json()
        return {status:true, data: data.data}
    }
    else
    {
        const error = await response.json();
        return {status: false, data: error.message}
    }
}

async function populateCategories(data)
{
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";
    if(data.status)
        {
            if(data.data && Array.isArray(data.data) && data.data.length > 0)
            {
                const newData = data.data; 
                for(let i = 0; i < newData.length; i++)
                {
                    const row = document.createElement('tr');
                    const sN = document.createElement('td');
                    sN.textContent = i + 1

                    const name = document.createElement("td");
                    name.textContent = newData[i].categoryName;
                    name.id = "category-name"

                    const description = document.createElement("td");
                    description.textContent = newData[i].categoryDescription;
                    description.id = "category-description";

                    const actionCell = document.createElement("td");

                // Create action buttons
                    const actionButton = document.createElement('div')

                    const updateBtn = document.createElement("button");
                    updateBtn.textContent = "Update";
                    updateBtn.classList.add("update-btn");
                    updateBtn.dataset.id = newData[i].categoryId;

                    
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add("delete-btn");
                    deleteBtn.dataset.id = newData[i].categoryId;

                    deleteBtn.style.width = "40%";
                    updateBtn.style.width = "40%";


                    actionButton.appendChild(updateBtn);
                    actionButton.appendChild(deleteBtn);
                    actionCell.appendChild(actionButton);

                    actionButton.style.display = "flex";
                    actionButton.style.width = "80%";
                    actionButton.style.justifyContent = "space-between";

                    row.appendChild(sN);
                    row.appendChild(name);
                    row.appendChild(description);
                    row.appendChild(actionCell);

                    actionCell.style.display = "flex";
                    actionCell.style.justifyContent = "center"
                    tableBody.appendChild(row);

                }
            }
        }
}

async function addCategory(journalObject, token)
{
    const response = await fetch("https://localhost:7240/api/Category/CreateCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(journalObject),
    });

    if(response.ok)
    {
        const data = await response.json()
        return {status: true, data: data.data}
    }
    else
    {
        const error = await response.json();
        return {status: false, data: error.message}
    }
}

async function deleteJournal(token, categoryId)
{
    const response = await fetch(`https://localhost:7240/api/Category/DeleteCategory?categoryId=${categoryId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();  // Parse the response
        return { status: false }
    }

    const data = await response.json();
    return { status: true, data };
}

async function updateJournal(token, category)
{
    const response = await fetch(`https://localhost:7240/api/Category/UpdateCategory`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body : JSON.stringify(category),

    });

    if (!response.ok) {
        const error = await response.json();  // Parse the response
        return { status: false }
    }

    const data = await response.json();
    return { status: true, data };
}