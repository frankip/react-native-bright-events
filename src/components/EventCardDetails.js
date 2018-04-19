import React from 'react';

const EventCardDetails = () => {
  console.log("asdfghj");
  return (
    <div>
      <section className="row wide event-container">
        <div className="overlay"></div>
        <h2 className="text-display">Color Festival</h2>
        <h3 className="text-display">9th December 2017</h3>
        <h4 className="text-display">Nairobi</h4>
      </section>
      <section className="row event-description">
        <div className="column large-8 small-12">
          <h3>Description</h3>
          <p> Odit et sint temporibus facilis omnis molestiae et. Et laborum sint dolorem eveniet. Qui quaerat reprehenderit omnis provident. Necessitatibus blanditiis esse delectus ipsum. Non quibusdam quaerat laborum. Fugit ipsa possimus blanditiis possimus cumque perspiciatis. </p>
        </div>
        <div className="column large-3 small-12"> <a className="button expanded">RSVP</a>
          <div className="row interactions">
            <div className="right">
              <li><a href="#"><i className="fa fa-pencil"></i> </a></li>
              <li><a href="#"><i className="fa fa-trash-o"></i></a></li>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventCardDetails;

