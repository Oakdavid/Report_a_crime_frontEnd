document.addEventListener("DOMContentLoaded", async () => {
    try{
        const token = getToken()
        const categories = await getAllCategories(token);
        console.log(categories.data);
        const tableBody = document.querySelector("#table-body");
        tableBody.innerHTML = "";

        await populateCategories(categories, tableBody);



        const submit = document.querySelector("#submit-btn");
        const categoryName = document.querySelector("#category-name");
        const categoryDescription = document.querySelector("#category-description");

        if(submit)
        {
            submit.addEventListener("click", async (e) => {

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
                    // await populateCategories(categories);
                    window.location.reload();
                }
                else
                {
                    Swal.fire({
                        title: "Oops....!",
                        text: `${result.message}`,
                        icon: "success"
                    });
                }
            })
        }

        if(tableBody)
        {
            populateCategories(token);
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
                            const resp = await deleteCategory(token, categoryId);
        
                            if (!resp.status) {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to delete the category.",
                                    icon: "error"
                                });
                            } else {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The category has been deleted.",
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
                        confirmButtonText: "Yes, update it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const resp = await updateCategory(token, objectData);
        
                            if (!resp.status) {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to update the category.",
                                    icon: "error"
                                });
                            } else {
                                Swal.fire({
                                    title: "Update!",
                                    text: "The catergory has been updated.",
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

async function populateCategories(data, tableBody)
{
    
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
                    updateBtn.style.background = "green";


                    
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add("delete-btn");
                    deleteBtn.style.background = "red";
                    deleteBtn.dataset.id = newData[i].categoryId;

                    deleteBtn.style.width = "100%";
                    updateBtn.style.width = "100%";


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

async function deleteCategory(token, categoryId)
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

async function updateCategory(token, category)
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