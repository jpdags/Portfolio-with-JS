let isDarkmode = localStorage.getItem('theme') === 'dark';
let originalAboutContent = null;
let originalContactContent = null;

function toggleTheme(){
    const toggleButtons = document.querySelectorAll('#theme-mode');
    const html = document.documentElement;

    isDarkmode = !isDarkmode;
    
    if(isDarkmode){
        html.setAttribute('data-theme', 'dark');
        toggleButtons.forEach(button => {
            button.querySelector('img').src = 'imgs/dark.gif';
        });
        localStorage.setItem('theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
        toggleButtons.forEach(button => {
            button.querySelector('img').src = 'imgs/light.gif';
        });
        localStorage.setItem('theme', 'light');
    }
}

function enableAboutEditing() {
    const aboutContent = document.getElementById('about-content');
    const editBtn = document.getElementById('about-edit-btn');
    const saveBtn = document.getElementById('about-save-btn');
    const cancelBtn = document.getElementById('about-cancel-btn');
    
    originalAboutContent = aboutContent.innerHTML;
    
    aboutContent.classList.add('editing');
    aboutContent.querySelectorAll('p, strong').forEach(element => {
        element.setAttribute('contenteditable', 'true');
    });
    
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function enableContactEditing() {
    const contactContent = document.getElementById('contact-content');
    const editBtn = document.getElementById('contact-edit-btn');
    const saveBtn = document.getElementById('contact-save-btn');
    const cancelBtn = document.getElementById('contact-cancel-btn');
    
    originalContactContent = contactContent.innerHTML;
    
    contactContent.classList.add('editing');
    contactContent.querySelectorAll('p, a').forEach(element => {
        element.setAttribute('contenteditable', 'true');
    });
  
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function disableAboutEditing() {
    const aboutContent = document.getElementById('about-content');
    const editBtn = document.getElementById('about-edit-btn');
    const saveBtn = document.getElementById('about-save-btn');
    const cancelBtn = document.getElementById('about-cancel-btn');
    
    aboutContent.classList.remove('editing');
    aboutContent.querySelectorAll('p, strong').forEach(element => {
        element.setAttribute('contenteditable', 'false');
    });
    
    
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function disableContactEditing() {
    const contactContent = document.getElementById('contact-content');
    const editBtn = document.getElementById('contact-edit-btn');
    const saveBtn = document.getElementById('contact-save-btn');
    const cancelBtn = document.getElementById('contact-cancel-btn');
    
    
    contactContent.classList.remove('editing');
    contactContent.querySelectorAll('p, a').forEach(element => {
        element.setAttribute('contenteditable', 'false');
    });
    
    
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function saveAboutContent() {
    disableAboutEditing();
    
    showNotification('About section changes saved successfully!');
}

function saveContactContent() {
    disableContactEditing();
    
    showNotification('Contact information changes saved successfully!');
}

function cancelAboutEditing() {
    const aboutContent = document.getElementById('about-content');
    
    if (originalAboutContent) {
        aboutContent.innerHTML = originalAboutContent;
    }
    
    disableAboutEditing();
}

function cancelContactEditing() {
    const contactContent = document.getElementById('contact-content');
    
    if (originalContactContent) {
        contactContent.innerHTML = originalContactContent;
    }
    
    disableContactEditing();
}

function showNotification(message){
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Profile picture upload functionality
function handleProfilePictureUpload(event) {
    event.preventDefault();
    
    const form = event.target;
    const fileInput = form.querySelector('input[type="file"]');
    const profileImg = document.querySelector('.image-container img');
    
    if (!fileInput.files || !fileInput.files[0]) {
        alert('Please choose an image to upload.');
        return;
    }
    
    // Confirm before uploading
    const confirmUpload = confirm("Are you sure you want to replace your profile picture?");
    if (!confirmUpload) {
        return;
    }
    
    const formData = new FormData(form);
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        return response.text();
    })
    .then(result => {
        // Extract the filename from the response
        const match = result.match(/uploads\/([^"']+)/);
        if (match && match[1]) {
            const filename = match[1];
            // Update the profile image src with the new uploaded image
            if (profileImg) {
                profileImg.src = `/uploads/${filename}?ts=${Date.now()}`;
                showNotification('Profile picture updated successfully!');
            }
        } else {
            showNotification('Upload successful!');
        }
        
        // Reset the form
        form.reset();
    })
    .catch(error => {
        console.error('Upload error:', error);
        alert('Error uploading image. Please try again.');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('#theme-mode');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
    
    document.getElementById('about-edit-btn').addEventListener('click', enableAboutEditing);
    document.getElementById('about-save-btn').addEventListener('click', saveAboutContent);
    document.getElementById('about-cancel-btn').addEventListener('click', cancelAboutEditing);
    
    document.getElementById('contact-edit-btn').addEventListener('click', enableContactEditing);
    document.getElementById('contact-save-btn').addEventListener('click', saveContactContent);
    document.getElementById('contact-cancel-btn').addEventListener('click', cancelContactEditing);
    
    // Handle the upload form submission
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleProfilePictureUpload);
    }
    
    // Make profile image clickable to trigger file input
    const profileImg = document.querySelector('.image-container img');
    const fileInput = document.querySelector('#uploadForm input[type="file"]');
    
    if (profileImg && fileInput) {
        profileImg.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Update profile image preview when file is selected
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImg.src = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    if (isDarkmode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleButtons.forEach(button => {
            button.querySelector('img').src = 'imgs/dark.gif';
        });
    }
    
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});