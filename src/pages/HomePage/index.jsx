import React from 'react';
import FeatureItem from '../../components/FeatureItem';
import { featuresList } from './features';
/** @typedef {import('./features').feature} feature Raccourci pour importer un type */

/**
 * @description Page accueil
 * @returns {JSX.Element} La Home page
 */
function HompePage() {
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {featuresList.map(
          (
            /** @type {feature} */ { title, description, picAlt, picPath },
            index
          ) => (
            <FeatureItem
              key={`icon-${1000 + index}`}
              title={title}
              description={description}
              picPath={picPath}
              picAlt={picAlt}
            />
          )
        )}
      </section>
    </main>
  );
}

export default HompePage;
