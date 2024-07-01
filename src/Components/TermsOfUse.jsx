import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../Styles/TermsOfUse.css";

const TermsOfUse = () => {
  const [termsCollapsed, setTermsCollapsed] = useState(true);

  const toggleTerms = () => {
    setTermsCollapsed(!termsCollapsed);
  };

  return (
    <div className="termsOfUse">
      <button
        className="button-generic-transition"
        onClick={toggleTerms}
        style={{
          textDecoration: "underline",
          width: "max-content",
        }}
      >
        {termsCollapsed ? (
          <>
            <FaChevronDown className="iconSpace" />
            &nbsp;Show Terms of Use
          </>
        ) : (
          <>
            <FaChevronUp className="iconSpace" />
            &nbsp;Hide Terms of Use
          </>
        )}
      </button>
      {!termsCollapsed && (
        <div className="termsContent">
          <div className="termsColumns">
            <div className="termsColumn">
              <p>
                <strong>1. Introduction</strong>
                <br />
                Welcome to the <strong>Co-Working</strong> space. By using our
                facilities and services, you agree to comply with the following
                Terms of Use.
              </p>
              <p>
                <strong>2. Registration and Membership</strong>
                <br />
                <strong>Registration:</strong> All users must register and
                provide valid and updated information to use our facilities.
                <br />
                <strong>Membership:</strong> Membership plans may include daily,
                monthly, or annual access and are subject to the terms specified
                in the membership contract.
              </p>
              <p>
                <strong>3. Access and Use of the Space</strong>
                <br />
                <strong>Hours:</strong> The coworking space is available for use
                during the established hours, which are Monday to Friday from
                9:00 AM to 7:00 PM.
                <br />
              </p>
              <p>
                <strong>4. User Conduct</strong>
                <br />
                <strong>Respect and Consideration:</strong> All users must
                behave professionally and respectfully. No form of harassment,
                discrimination, or disruptive behavior will be tolerated.
                <br />
                <strong>Noise:</strong> Maintain appropriate noise levels to
                avoid disturbing other users. The use of headphones for phone
                calls and video conferences is recommended.
                <br />
                <strong>Cleanliness and Order:</strong> Keep your workspace
                clean and orderly. Dispose of trash in the appropriate
                containers and do not leave personal belongings unattended.
              </p>
              <p>
                <strong>5. Security and Responsibility</strong>
                <br />
                <strong>Security:</strong> Users are responsible for the
                security of their personal belongings. The coworking space is
                not responsible for loss or damage to personal items.
                <br />
                <strong>Responsibility:</strong> Users are responsible for any
                damage caused to the furniture, equipment, or facilities of the
                coworking space.
              </p>
            </div>
            <div className="termsColumn">
              <p>
                <strong>6. Services and Equipment</strong>
                <br />
                <strong>Internet:</strong> We provide high-speed internet
                access. The use of the network must be legal and appropriate,
                avoiding activities such as downloading illegal content.
                <br />
                <strong>Common Equipment:</strong> Users may use common
                equipment (printers, copiers, etc.) subject to availability.
              </p>
              <p>
                <strong>7. Reservations and Use of Rooms</strong>
                <br />
                <strong>Reservations:</strong> Meeting rooms and other
                reservable spaces must be booked in advance through the
                coworking space's reservation system.
                <br />
                <strong>Use:</strong> Use the meeting rooms only for the
                reserved time and leave the space clean and orderly for the next
                user.
              </p>
              <p>
                <strong>8. Payment</strong>
                <br />
                <strong>Payment:</strong> Membership fees and other charges must
                be paid promptly as agreed in the membership contract.
                <br />
              </p>
              <p>
                <strong>9. Termination and Cancellation</strong>
                <br />
                <strong>Termination by the User:</strong> Users may cancel their
                membership by following the process established in the
                membership contract.
                <br />
                <strong>Termination by the Coworking Space:</strong> We reserve
                the right to terminate the membership of any user who violates
                these Terms of Use.
              </p>
              <p>
                <strong>10. Modifications to the Terms</strong>
                <br />
                We reserve the right to modify these Terms of Use at any time.
                Modifications will be communicated to users via the registered
                email.
              </p>
              <p>
                <strong>11. Contact</strong>
                <br />
                For any questions or comments about these Terms of Use, please
                contact the coworking space administration at
                espacios@coworking.cl.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsOfUse;
