difficultySelector(button_pressed)
{
    if(button_pressed == "A" && this.difficulty_counter !=1)
    {
        this.difficulty_counter -= 1;
    }
    else if (button_pressed == "D" && this.difficulty_counter !=3)
    {
        this.difficulty_counter += 1;
    }
    else
    {
        return false;
    }
    this.difficulty_type_text.destroy();
    switch(this.difficulty_counter)
    {
        case 1:
            this.difficulty_type_text = this.add.text(725,425,"Easy",this.difficulty_type_style);
            break;
        case 2:
            this.difficulty_type_text = this.add.text(715,425,"Normal",this.difficulty_type_style);
            break;
        case 3:
            this.difficulty_type_text = this.add.text(725,425,"Hard",this.difficulty_type_style);
            break;
    }   
    return true;
}
this.difficulty_counter = 1;
this.difficulty_type_style = { font: '80px Game Over', fill: '#fff' };
this.difficulty_type_text = this.add.text(725,425,"Easy" , this.difficulty_type_style);