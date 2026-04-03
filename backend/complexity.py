import textstat

def calculate_complexity(text: str) -> tuple:
    if not text.strip():
        return 0, "LOW"
    
    # Calculate Flesch-Kincaid Grade Level
    grade_level = textstat.flesch_kincaid_grade(text)
    
    # Also get reading ease for better classification
    reading_ease = textstat.flesch_reading_ease(text)
    
    # Map grade level to complexity label
    if grade_level <= 8:
        label = "LOW"
    elif grade_level <= 14:
        label = "MEDIUM"
    else:
        label = "HIGH"
    
    # Return a score (0-100, higher = more complex)
    score = min(int(grade_level * 6.67), 100)
    
    return score, label

def get_readability_metrics(text: str) -> dict:
    return {
        "flesch_kincaid_grade": textstat.flesch_kincaid_grade(text),
        "flesch_reading_ease": textstat.flesch_reading_ease(text),
        "gunning_fog": textstat.gunning_fog(text),
        "smog_index": textstat.smog_index(text),
        "automated_readability_index": textstat.automated_readability_index(text),
        "coleman_liau_index": textstat.coleman_liau_index(text),
        "linsear_write_formula": textstat.linsear_write_formula(text),
        "dale_chall_readability_score": textstat.dale_chall_readability_score(text),
    }

if __name__ == "__main__":
    test_text = "This is a sample text. It is quite simple to read and understand."
    score, label = calculate_complexity(test_text)
    print(f"Score: {score}, Label: {label}")