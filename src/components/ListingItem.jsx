import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import { ReactComponent as BedIcon } from '../assets/svg/bedIcon.svg'
import { useContext } from 'react'
import ThemeContext from '../context/theme/ThemeContext'

function ListingItem({ listing, id, onEdit, onDelete }) {
  const { theme } = useContext(ThemeContext)

  return (
    <li className='listingItem'>
      <Link to={`/listings/${id}`} className='listingItemLink'>
        <div className='listingItemDetails'>
          <p className='listingItemLocation'>{listing.name}</p>
          <p className='listingItemName'>{listing.address}</p>

          <p className='listingItemPrice'>
            {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <div className='listingItemInfoDiv'>
            <BedIcon fill={theme === 'dark' ? '#fff' : '#000'} />
            <p className='listingItemInfoText'>{listing.bedrooms} اتاق خواب</p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(id)}
        />
      )}

      {onEdit && (
        <EditIcon
          className='editIcon'
          fill={theme === 'dark' ? '#fff' : '#000'}
          onClick={() => onEdit(id)}
        />
      )}
    </li>
  )
}

export default ListingItem
