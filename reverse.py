import re
import sys

def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        grid_inner = match.group(1)
        # Match each <div class="course-item"> block
        # We look for <div class="course-item"> up until the next </div> that completes it.
        # We can just split by <div class="course-item">
        parts = re.split(r'([ \t]*<div class="course-item">)', grid_inner)
        if len(parts) <= 1:
            return match.group(0)
            
        initial_whitespace = parts[0]
        items = []
        for i in range(1, len(parts), 2):
            item = parts[i] + parts[i+1] # The div start tag + the content
            items.append(item)
            
        items.reverse()
        
        # We need to make sure the last item has proper spacing at the end if we want
        # But generally joining them should be fine.
        new_inner = initial_whitespace + "".join(items)
        return '<div class="course-grid">' + new_inner + '</div>'
        
    new_content = re.sub(r'<div class="course-grid">(.*?)</div>\s*</details>', 
                         lambda m: replacer(m) + '\n                        </details>', 
                         content, flags=re.DOTALL)
                         
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Finished writing {filepath}")

if __name__ == "__main__":
    process_file('zh/index.html')
    process_file('en/index.html')
