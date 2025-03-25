import React, { useState, useRef, useEffect } from 'react';
import {Contrydata} from "./Data"
type Option = {
  label: string;
  value: string;
};

const options: Option[] = Contrydata
const ComboBox: React.FC = () => {
    const [Selected, setselected] = useState<string[]>([]);
    const [text, setText] = useState('');  // साधारण variable name
    const [showList, setShowList] = useState(false);  // basic state name
    const [currentSelect, setCurrentSelect] = useState(-1);  // हिंदी/English mix
    const [allItems, setAllItems] = useState<Option[]>(options);  // generic name
    const inputBox = useRef<HTMLInputElement>(null);  // simple ref name
  
    // फिल्टर करने का basic तरीका
    useEffect(() => {
      let newItems = options;  // temporary variable
      
      if(text.length > 0) {
        newItems = options.filter(item => {
          return item.label.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        });
      }
      if (newItems.length === 0) {
        newItems = [{ label: 'No results found', value: 'no_result',}];
      }
      setAllItems(newItems);  // सीधा set कर दिया
      setCurrentSelect(-1);   // reset selection
      
    }, [text]);
  
    // कीबोर्ड हेंडलिंग का basic तरीका
    function handleKeys(e: React.KeyboardEvent) {
      // Arrow Down
      if(e.key === 'ArrowDown') {
        if(currentSelect < allItems.length-1) {
          setCurrentSelect(currentSelect + 1); 
        }
      }
      
      // Arrow Up
      if(e.key === 'ArrowUp') {
        if(currentSelect > 0) {
          setCurrentSelect(currentSelect - 1);
        }
      }
      
      // Enter press
      if(e.key === 'Enter') {
        if(currentSelect !== -1) {
            setText('')
          setselected(prevItems => [...prevItems, allItems[currentSelect].label]);
          setShowList(false);
        }
      }
      
      // Escape press
      if(e.key === 'Escape') {
        setShowList(false);
      }
    }
  
    // ऑप्शन क्लिक करने पर
    const itemClicked = (item: Option) => {
        setText('')
      setselected(prevItems => [...prevItems, item.label]);
     // सीधा text set कर दिया
      setShowList(false);   // लिस्ट बंद
    };
  const deleteitem=(id:number)=>{
    setselected((prevItems) => {
        const newItems = [...prevItems]; // पुरानी ऐरे की कॉपी बनाएँ
        newItems.splice(id, 1); // दिए गए index से 1 एलिमेंट हटाएँ
        return newItems;
      });
  }
    return (
      <div>
        
        <div>
        {Selected.map((item, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <div
              onClick={() => deleteitem(index)}
             className='btn-cln'
            >
              X
            </div>
            <button style={{ padding: '10px 20px' }}>{item}</button>
          </div>
        ))}
        
        </div>
        
        <input
          type="text"
          value={text}
          ref={inputBox}

          onChange={(e) => {
            setText(e.target.value);  // सीधा state update
            setShowList(true);        // लिस्ट दिखाओ
          }}
          onFocus={() => setShowList(true)}  // सीधा true set
          onBlur={() => setTimeout(() => setShowList(false), 300)} // बेसिक blur handling
          onKeyDown={handleKeys}
          placeholder="Search country..."
          style={{
            width: '50%',
            padding: '10px',
            fontSize: '16px'
          }}
        />
  
        {showList && (
          <div className='boxlist'>
            {allItems.map((item, index) => (
              <div
                key={item.value}
                onClick={() => itemClicked(item)}  // सीधा onClick use किया
                style={{
                  padding: '8px',
                  backgroundColor: index === currentSelect ? '#e0e0e0' : 'white',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
        </div>
        
   
    );
  };
  
  export default ComboBox;