<div id="demo-announcement" class="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white text-center py-3 px-4 text-sm font-medium relative z-50 shadow-lg">
    <div class="flex items-center justify-center gap-3 max-w-6xl mx-auto">
        <div class="flex-shrink-0">
            <svg class="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
        </div>
        <div class="flex-1 overflow-hidden">
            <div id="announcement-text" class="transition-all duration-500 ease-in-out">
                <span class="announcement-message block" data-message="0">🚀 This is a demo version - Explore all features! Data resets every 24 hours.</span>
                <span class="announcement-message hidden" data-message="1">🎆 Try creating vCards, managing contacts, and testing all premium features!</span>
                <span class="announcement-message hidden" data-message="2">📊 Experience the full power of our platform - No limitations in demo mode!</span>
                <span class="announcement-message hidden" data-message="3">🎁 Ready to get started? Sign up for your free account today!</span>
            </div>
        </div>
        <button onclick="closeDemoAnnouncement()" class="flex-shrink-0 ml-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all duration-200">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </button>
    </div>
</div>
<style>
    /* Override sidebar positioning when announcement bar is present */
    body:has(#demo-announcement) [data-slot="sidebar"] {
        top: 60px !important;
        height: calc(100svh - 60px) !important;
    }
    
    body:has(#demo-announcement) [data-sidebar="sidebar"] {
        top: 60px !important;
        height: calc(100svh - 60px) !important;
    }
    
    /* For the fixed positioned sidebar container */
    body:has(#demo-announcement) .group.peer.text-sidebar-foreground > div:last-child {
        top: 60px !important;
        height: calc(100svh - 60px) !important;
    }
    
</style>
<script>
function closeDemoAnnouncement() {
    document.getElementById('demo-announcement').style.display = 'none';
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
        if (style.textContent.includes('data-slot="sidebar"')) {
            style.remove();
        }
    });
}

(function() {
    const messages = document.querySelectorAll('.announcement-message');
    if (messages.length > 1) {
        let currentIndex = 0;
        setInterval(() => {
            messages[currentIndex].classList.add('hidden');
            currentIndex = (currentIndex + 1) % messages.length;
            messages[currentIndex].classList.remove('hidden');
        }, 3000);
    }
})();
</script>