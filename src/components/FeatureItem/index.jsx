import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Afficher un div qui présente une fonctionnalité
 * @param {Object} props
 * @param {string} props.title Le titre de la fonctionnalité
 * @param {string} props.description Un description courte
 * @param {string} props.picPath Le chemin vers l'image
 * @param {string} props.picAlt Le texte alternatif à l'image
 * @returns {JSX.Element} Feature item
 */
function FeatureItem(props) {
  const { title, description, picPath, picAlt } = props;
  return (
    <div className="feature-item">
      <img src={picPath} alt={picAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

FeatureItem.propTypes = {
  title: PropTypes.string.isRequired,
  picPath: PropTypes.string.isRequired,
  picAlt: PropTypes.string,
  description: PropTypes.string,
};

FeatureItem.defaultProps = {
  picAlt: 'feature icon',
  description: '',
};

export default FeatureItem;
