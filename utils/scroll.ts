// Scroll utility for navigating to plans section
export const scrollToPlans = () => {
    const plansSection = document.getElementById('plans-section');
    if (plansSection) {
        plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
