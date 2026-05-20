waitForElement('#title_courses', function(element) {
    setTimeout(function() {
        element.classList.add("active");
        console.log("Element found and class added after 2 seconds");
    }, 100);
});

function renderCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');
    
    coursesGrid.innerHTML = '';
    
    if (courses.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="assets/images/${course.image}" alt="${course.title}" onerror="this.style.display='none'; this.parentNode.innerHTML='<i class=\'fas fa-book\'></i> <p>${course.title}</p>';">
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                
                <div class="course-details">
                    
                    
                    <div class="course-detail">
                        <i class="fas fa-clock"></i>
                        <span>Duration: ${course.duration}</span>
                    </div>
                    
                </div>
                
                <div class="course-language">${course.language}</div>
                
                <div class="course-tags">
                    ${course.tags.map(tag => `<span class="course-tag">${tag}</span>`).join('')}
                </div>
                
                <div class="course-actions">
                    
                   <a href="https://ai4all.aisrilanka.org/lms/" class="btn-outline" target="_blank">LMS</a>

                </div>
            </div>
        `;
        
        coursesGrid.appendChild(courseCard);
    });
}

function fetchCourses() {
    const yearValue = document.getElementById('yearFilter').value;
    const monthValue = document.getElementById('monthFilter').value;
    const coordinatorValue = document.getElementById('coordinatorFilter').value;
    const tagValue = document.getElementById('tagFilter').value;
    const languageValue = document.getElementById('languageFilter').value;
    const searchValue = document.getElementById('searchFilter').value;
    
    const xhr = new XMLHttpRequest();
    const params = new URLSearchParams({
        year: yearValue,
        month: monthValue,
        coordinator: coordinatorValue,
        tag: tagValue,
        language: languageValue,
        search: searchValue
    });
    
    xhr.open('GET', 'php/get_courses.php?' + params.toString(), true);
    
    xhr.onload = function() {
        if (this.status === 200) {
            const responseText = this.responseText;
            const courses = [];
            
            if (responseText === "No courses found") {
                renderCourses([]);
                return;
            }
            
            const rows = responseText.split('\n');
            
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i].trim();
                if (!row) continue;
                
                const parts = row.split('|');
                if (parts.length >= 12) {
                    courses.push({
                        id: parts[0],
                        title: parts[1],
                        description: parts[2],
                        image: parts[3],
                        year: parts[4],
                        month: parts[5],
                        coordinator: parts[6],
                        coordinator_name: parts[7],
                        duration: parts[8],
                        credits: parts[9],
                        tags: parts[10] ? parts[10].split(',') : [],
                        language: parts[11]
                    });
                }
            }
            
            renderCourses(courses);
        } else {
            console.error('Request failed with status:', this.status);
        }
    };
    
    xhr.onerror = function() {
        console.error('Request failed');
    };
    
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCourses();
    
    document.getElementById('yearFilter').addEventListener('change', fetchCourses);
    document.getElementById('monthFilter').addEventListener('change', fetchCourses);
    document.getElementById('coordinatorFilter').addEventListener('change', fetchCourses);
    document.getElementById('tagFilter').addEventListener('change', fetchCourses);
    document.getElementById('languageFilter').addEventListener('change', fetchCourses);
    document.getElementById('searchFilter').addEventListener('input', fetchCourses);
    
    document.getElementById('resetFilters').addEventListener('click', function() {
        document.getElementById('yearFilter').value = 'all';
        document.getElementById('monthFilter').value = 'all';
        document.getElementById('coordinatorFilter').value = 'all';
        document.getElementById('tagFilter').value = 'all';
        document.getElementById('languageFilter').value = 'all';
        document.getElementById('searchFilter').value = '';
        fetchCourses();
    });
    
    const filterToggle = document.getElementById('filterToggle');
    const filterOptions = document.getElementById('filterOptions');
    
    if (filterToggle && filterOptions) {
        filterToggle.addEventListener('click', function() {
            filterOptions.classList.toggle('active');
        });
    }
});